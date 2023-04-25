import React, { useEffect, useState } from "react";
import instance, { getData, updateData } from "axios/interceptor";
import toast, { Toaster } from "react-hot-toast";
import { Modal } from "components/modal";
import { FiTrash2, FiEdit, FiChevronsDown, FiChevronsUp } from "react-icons/fi";



import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Box,
  Button,
  Flex,
  Heading,
  Spacer,
  useDisclosure,
  Input,
} from '@chakra-ui/react'
import { useForm } from "react-hook-form";
import { error } from "console";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Link } from "react-router-dom";

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
}

export const TablePage = () => {

  //Accessing the client
  const queryClient = useQueryClient();

  const { isOpen, onOpen, onClose } = useDisclosure()
  const [Data, setData] = useState<User[]>([]);
  const [dataHold, setDataHold] = useState<User | undefined>()
  const { register, handleSubmit, getValues, reset, formState: { errors } } = useForm<User[]>();


  //using useQuery to fetch data

  const { isLoading, error, data, isSuccess } = useQuery<User[], Error>(["fetchingData"], () => getData('/v1/users')

  )
  console.log(data)

  useEffect(() => {
    setData(data)

  }, [JSON.stringify(data)]);






  // const fetchData = async () => {
  //   try {
  //     const resp = await getData('/v1/users')
  //     setData(resp);
  //   } catch (error) {
  //     toast.error('Something happened.')
  //   }
  // }
  // useEffect(() => {
  //   fetchData();
  // }, []);




  //Mutation for Putting data
  const { mutate } = useMutation(
    (formData: User) => updateData(`/v1/users/${dataHold?.id}`, formData),
    {
      onSuccess: (data: User) => {
        queryClient.invalidateQueries("users");
        toast.success("User added successfully.");
        window.location.reload()
      },
      onError: () => {
        toast.error("Failed to add user.");
      },
    }
  );
  const onSubmit = async () => {
    const formData = getValues();
    mutate(formData);
    onClose();
  };

  useEffect(() => {
    const defaultValue = { name: dataHold?.name, email: dataHold?.email }
    reset(defaultValue);
  }, [dataHold]);

  // const onSubmit = async () => {
  //   const formData = getValues()
  //   try {
  //     const response = await updateData(`/v1/users/${dataHold?.id}`, formData)
  //   }
  //   catch {
  //     console.log('error')
  //   }
  // }

  if (isLoading) {
    return <span>Loading...</span>
  }

  if (error) {
    return toast.error('Something happened.')


  }


  return (
    <Box py="4rem"  >
      <Flex flexDirection="column" px="3rem">
        <Flex >
          <Heading> Profile </Heading>
          <Spacer />

       <Link to="/create-user-page"> <Button justifySelf="end" width="8rem" bg="purple" color="white" mb="2rem">Add Users +</Button></Link>
        </Flex>
        <TableContainer border='1px' borderColor='gray.200' p="1rem">
          <Table variant='simple'>

            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>Name</Th>
                <Th>Email</Th>
                <Th >Role</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>

            <Tbody key={JSON.stringify(Data)}>
              {
                Data && Data?.map((a: User, index: number) => {
                  return (
                    <Tr key={a.id}>
                      <Td>{index + 1}</Td>
                      <Td>{a.name}</Td>
                      <Td >{a.email}</Td>
                      <Td >{a.role}</Td>
                      <Td>
                        <Flex gap="5px">

                          <Button onClick={() => {
                            const filterData = Data.filter(e => e.id !== a.id)

                            setData(filterData)
                          }}><FiTrash2 /></Button>

                          <Button onClick={() => { onOpen(), setDataHold(a) }}><FiEdit />
                          </Button>
                          <Button
                            onClick={() => {
                              let newIndex = index + 1; // calculate the new index (one position to the right)
                              const x = [...Data]; // create a copy of the data array
                              if (newIndex < x.length) { // make sure the new index is within the bounds of the array
                                x.splice(newIndex, 0, x.splice(index, 1)[0]); // move the object to the new index
                              }
                              setData(x); // update the state with the updated array


                            }}
                          ><FiChevronsDown


                            /></Button>
                          <Button
                            onClick={() => {
                              let newIndex = index - 1; // calculate the new index (one position to the right)
                              const x = [...Data]; // create a copy of the data array
                              if (newIndex >= 0) {
                                x.splice(newIndex, 0, x.splice(index, 1)[0]);
                              }
                              setData(x); // update the state with the updated array


                            }}
                          ><FiChevronsUp /></Button>
                        </Flex>
                      </Td>
                    </Tr>
                  )
                })
              }

            </Tbody>



          </Table>
        </TableContainer>

      </Flex>
      {isOpen && <Modal secondariAction={{ label: 'Cancel', onClick: () => { onClose() } }} primaryAction={{ label: 'Save', onClick: handleSubmit(onSubmit) }} isOpen={isOpen} onClose={onClose}  >
        <form >

          <label> Name</label>
          <Input my="10px"  {...register("name")} />
          <label>Email</label>
          <Input my="10px"  {...register("email")} />
        </form>

      </Modal>}

    </Box>
  );
};
