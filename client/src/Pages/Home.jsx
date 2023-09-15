import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Box,Button,Flex, useDisclosure, Input

} from '@chakra-ui/react'

export default function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [notes, setNotes] = useState([])
  const [value, setValue] = useState("")

  useEffect(() => {

    const make_api_request = async () => {
        // package.json da proxy url verdik oradan gelecek önek
        try {

            const request = await fetch("http://127.0.0.1:8000/api/v1/notes", {
                
                headers: {
                    "Content-type": "application/json"
                }
            })

            const response = await request.json()
            // state güncelle
            setNotes(response)
            console.log("data:", response)

        } catch (e) {
            
            console.log("e:", e)
        }



    }


    make_api_request()

  }, [])


  // yeni todo
  const makeRequest = async (event) => {

    event.preventDefault()

    const data = {

      task: value
    }

    const request = await fetch(`http://127.0.0.1:8000/api/v1/notes/create`, {
      // post ve put isteklerinde headers verilmeli
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },

     body: JSON.stringify(data)

    })
    const response = await request.json()

    console.log("C: gelen veri:", response)
    // frontend güncelle
    setNotes([...notes, response])
    // valueyi temizle
    setValue("")

    onClose()

  }

  return (
    <>

    <Box w="75%" m="auto" mt={5}>

    <Flex>
    <h3>AnaSayfa</h3>
    <Button onClick={onOpen} ms={'auto'} colorScheme='green' size={'sm'} variant={'ghost'}>+</Button>
    </Flex>

    <hr />

    {/* notlari maple */}
    <ul>

    {notes.map((not) => {

      return <li key={not.id}>
        <Link to={`/notlar/${not.id}`}>
            <p>{not.task}</p>
        </Link>
     
        <p> <small>{new Date(not.createdAt).toLocaleString("tr-TR")}</small></p>
      </li>

    })}

    </ul>

    </Box>
    

    <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Not Ekle</ModalHeader>
          <ModalCloseButton />
          <ModalBody> 

          <form onSubmit={makeRequest}>

          
          <Box>
          <Input onChange={(e) => setValue(e.target.value)} value={value} variant='flushed' placeholder='Task' />
          </Box>
       
        

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              İptal Et
            </Button>
            <Button type='submit' variant='ghost'>Ekle</Button>
          </ModalFooter>

          </form>
          </ModalBody>

        </ModalContent>
      </Modal>

    </>
  )
}
