// @ts-nocheck

import React, { Fragment, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { modalState } from '../atoms/modalAtom';
import { Dialog, Transition } from '@headlessui/react';
import { CameraIcon } from '@heroicons/react/outline';
import { addDoc, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import { db, storage } from '../firebase';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';

const Modal = () => {
    const[open,setOpen] = useRecoilState(modalState);
    const filePickerRef = useRef("");
    const [selectedFile, setSelectedFile] = useState("");
    const captionRef:any = useRef("");
    const [loadings, setLoadings] = useState(false);
    const{ data: session} = useSession();

    const uploadPost = async()=> {
        if(loadings) return;
        setLoadings(true);
        // 1. Create a post and add to firestore posts collection
        // 2. get the post to for the newly created post
        // 3. upload the image to firebase storage with the post id
        // 4. get a download url from fb storage and update the original post with image

        const docRef = await addDoc(collection(db,"posts"),{
            username: (session?.user as any).username,
            caption: captionRef.current.value,
            profileImg: session?.user?.image,
            timestamp: serverTimestamp(),
        })
        console.log("New doc id: ", docRef.id);

        const imageRef = ref(storage, `posts/${docRef.id}/image`);

        await uploadString(imageRef, selectedFile,"data_url").then(async snapshot=>{
            const downloadURL = await getDownloadURL(imageRef);

            await updateDoc(doc(db,'posts',docRef.id),{
                image: downloadURL,
            })
        });

        setOpen(false);
        setLoadings(false);
        setSelectedFile("");
    }

    const addImageToPost = (e: React.ChangeEvent<HTMLInputElement>)=> {
        const reader = new FileReader();
        if(e.target.files[0]){
            reader.readAsDataURL(e.target.files[0]);
        }
        reader.onload = (readerEvent:any)=>{
            setSelectedFile(readerEvent.target.result);
        }
    };

    const removeImage = (e: React.MouseEvent<HTMLParagraphElement, MouseEvent>) => {
        setSelectedFile("");
    };

  return (
    <Transition.Root show={open} as={Fragment}>
        <Transition appear show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={()=>setOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-50" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-auto max-w-md transform overflow-hidden rounded-2xl bg-white p-6 align-middle shadow-xl transition-all items-center justify-center text-center">

                

                {/* Title */}
                {!selectedFile ?
                <> 
                {/* camera icon */}
                <div 
                  onClick={()=>(filePickerRef.current as any).click()}
                  className='mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 hover:bg-red-200 cursor-pointer mb-2'>
                    <CameraIcon
                     className='h-6 w-6 text-red-500'
                     aria-hidden='true'
                     />
                  </div>
                
                  <Dialog.Title
                    as="h4"
                    className="text-sm font-semibold leading-6 text-gray-400"
                  >
                    Upload a Photo
                  </Dialog.Title>
                  </>
                   :
                  (
                  <div className='flex flex-col items-center justify-center'>
                    {/* Image Preview */}
                    <img className='h-40 object-contain ' src={selectedFile} alt="Image preview"/>
                    <p className='text-xs font-bold text-red-500 cursor-pointer' onClick={removeImage}>Remove</p>
                    </div>)
                  }

                  {/*Hidden photo input space */}
                  <div>
                    <input 
                    ref={filePickerRef}
                    type="file"
                    hidden
                    onChange={addImageToPost}
                    />
                  </div>

                  {/* Enter Caption */}
                  <div className="mt-2">
                    <input ref={captionRef} type="text" className="border-none focus:ring-0 w-full outline-none text-center text-sm font-semibold" placeholder="Please Enter a Caption..."/>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 cursor-pointer"
                      disabled={!selectedFile}
                      onClick={uploadPost}
                    >
                     {loadings?"Uploading..." :"Upload Post"}
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </Transition.Root>
  )
}

export default Modal;