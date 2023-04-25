import React, { useState } from "react";
import { Avatar, Box, Button, Center, Flex, FormControl, FormErrorMessage, FormLabel, Heading, Input, Select, VStack } from "@chakra-ui/react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { postData } from "axios/interceptor";
import { useMutation, useQuery, useQueryClient } from "react-query";
interface User {
  id: number;
  name: string;
  email: string;
   password: string & {
    readonly minLength: 8;
    readonly requiresNumber: true;
  };
  phone: string;
  role: string;
  avatar: string;
}


export const CreateUserPage = () => {
// Access the client
  const queryClient = useQueryClient()

  const [submitting, setSubmitting] = useState(false);


  const {
    handleSubmit, reset, getValues,
    register, formState: { errors, isSubmitting },
  } = useForm<User>({

  });

//using mutation to post data
  const { mutate } = useMutation(
    (formData: User) => postData('/v1/users/', formData),
    {
      onSuccess: (data: User) => {
        queryClient.invalidateQueries("users");
        toast.success("User added successfully.");
        reset();
      },
      onError: () => {
        toast.error("Failed to add user.");
      },
    }
  );
  const onSubmit = async () => {
    const formData = getValues();
    mutate(formData);

  };



  // const onSubmit = async () => {
  //   const formData = getValues()
  //   try {
  //     const response = await postData('/v1/users/', formData)
  //     console.log(response)
  //     toast.success("User created successfully");
  //     reset();
  //   }
  //   catch (error) {
  //     toast.error("Something went wrong");
  //   }
  // }
  return (
    <Box backgroundColor='blue.100' h="50vh">
      <Center >
        <Flex backgroundColor="white" mt="5rem" p="5rem" borderRadius="md" border='1px' borderColor='gray.200' >
          <VStack >
            <Heading as='h4' size='md' >
              Create User Info
            </Heading>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl isRequired>
                <FormLabel mt="3">Name</FormLabel>
                <Input type="text" {...register('name', { required: true })} />
                <FormErrorMessage>{errors?.name?.message}</FormErrorMessage>
              </FormControl>

              <FormControl isRequired>
                <FormLabel mt="3">Email</FormLabel>
                <Input type="email" {...register('email', { required: true })} defaultValue="" />
                <FormErrorMessage>{errors?.email?.message}</FormErrorMessage>
              </FormControl>


              <FormControl isRequired>
                <FormLabel mt="3">Password</FormLabel>
                <Input type="password" {...register('password', { required: true })} />
                <FormErrorMessage>{errors?.password?.message}</FormErrorMessage>
              </FormControl>
                <FormControl isRequired>
                <FormLabel mt="3">Role</FormLabel>
                <Select {...register("role")}>
                  <option value="customer">Customer</option>
                  <option value="admin">admin</option>
                </Select>
                <FormErrorMessage>{errors?.role?.message}</FormErrorMessage>
              </FormControl>

              <FormControl isRequired>
                <FormLabel mt="3">Avatar Link</FormLabel>
                <Input type="text" defaultValue="https://i0.wp.com/discussingfilm.net/wp-content/uploads/2022/09/Avatar-Neytiri-Eywa-Seed-James-Cameron.jpg?fit=1170%2C658&ssl=1" {...register('avatar', { required: true })} />
                <FormErrorMessage>{errors?.avatar?.message}</FormErrorMessage>
              </FormControl>



              <Button type="submit" colorScheme='cyan' mt="5" w="full" textColor="white" justifyItems="center" isLoading={submitting} >
                Submit
              </Button>

            </form>



          </VStack>
        </Flex>
      </Center>
    </Box>

  )

};
