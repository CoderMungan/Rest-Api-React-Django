import { Box } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { Flex, Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton, useDisclosure, Textarea } from '@chakra-ui/react'


export default function SingleNote() {
    // api/v1/notes/<id>
    const [error, setError] = useState(false)
    const [note, setNote] = useState(null)
    const { id } = useParams()
    const [loader, setLoader] = useState(true)
    const [name, setName] = useState("")
    const yonlendir = useNavigate()

    // modal
    const { isOpen, onOpen, onClose } = useDisclosure()

    const updateNote = async () => {
        
            const request = await fetch(`http://127.0.0.1:8000/api/v1/notes/${id}/update`, {

                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(note)
            })

            const response = await request.json()
            console.log("PUT:", response)
            setNote(response)
            setName(response.task)

            onClose()
          
    }


    const confirmDelete = async () => {

        const onayla = window.confirm("Bu notu silmek istiyor musunuz?")

        if (onayla) {

            const request = await fetch(`http://127.0.0.1:8000/api/v1/notes/${id}/delete`, {

                 method: "DELETE"
            })

            const response = await request.json()

            if (response.type === "deleted") {

                alert(response.message)
                // anasayfaya yönlendir
                yonlendir("/")
            } 

            console.log("gelen veri:", response)
        }
    }

    useState(() => {

        const make_api_request = async () => {
            // package.json da proxy url verdik oradan gelecek önek
            try {
    
                const request = await fetch(`http://127.0.0.1:8000/api/v1/notes/${id}`)
    
                const response = await request.json()

                if (response.type && response.type === "error") {

                    setError(true)
                    setLoader(false)
                    return;
                }
                // state güncelle
                setNote(response)
                console.log("data:", response)
                // not ismini güncelle
                setName(response.task)
                setLoader(false)
    
            } catch (e) {
                
                console.log("e:", e)
            }

        }


        make_api_request()

    }, [])


   if (loader) {

    return <p>Yükleniyor...</p>
   }


   if (error) {

    return <p>Böyle bir not bulunamadı.</p>
   }

  return (

        <>
        
        <Box  w="75%" m="auto" mt={5}>
        <h3>Notunuz</h3>
        <hr />

        

        <Flex mt={5}>

        <Box>
            <h1>{name}</h1>
        </Box>

        <Box ms={3}>

        <Button onClick={onOpen} colorScheme='teal' size='sm' variant="link">
            Düzenle
        </Button>

        <Button onClick={confirmDelete} colorScheme='red' size='sm' variant="link">
            Sil
        </Button>

        </Box>
      

        </Flex>
       

        </Box>



        <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Düzenle</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Textarea onChange={(e) => setNote({...note, task: e.target.value})} defaultValue={note.task}></Textarea>
            {console.log("state:", note)}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Kapat
            </Button>
            <Button onClick={updateNote} variant='ghost'>Tamamla</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
        
        </>
  )
}
