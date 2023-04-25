import { Box, Button, Center, Flex, FormControl, FormErrorMessage, FormLabel, Heading, Input, VStack } from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import axios from 'axios';
import { postData } from "axios/interceptor";


interface IFormInput {
  firstName: string;
  lastName: string;
  email: string & {
    readonly __brand: unique symbol;
    readonly __emailBrand: true;
  };
  password: string & {
    readonly minLength: 8;
    readonly requiresNumber: true;
  };

}


interface ApiData {
  firstName: string;
  lastName: string;
  email: string & {
    readonly __brand: unique symbol;
    readonly __emailBrand: true;
  };
  password: string & {
    readonly minLength: 8;
    readonly requiresNumber: true;
  };

}


const schema = yup.object({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email().required(),

  password: yup.string().required(),
}).required();

type FormData = yup.InferType<typeof schema>;





export const LoginPage = (): JSX.Element => {


  const [submitting, setSubmitting] = useState(false);
  const [apiData, setApiData] = useState<ApiData | null>(null);
  const navigate = useNavigate();

  const onSubmit = async (formData: IFormInput, event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    // event.preventDefault();

    try {
      setSubmitting(true);
      const x = await postData('/v1/auth/login/', formData)
      console.log('Response:', x);
      const { access_token } = x;
      console.log('Access Token:', access_token);
      localStorage.setItem('access_token', access_token);
      navigate('/add-user-page');

    }
    catch (error) {
      console.error(error);
      console.log('Error Response:', error.response);
    } finally {
      setSubmitting(false);
    }

  }



  const {
    handleSubmit,
    register, formState: { errors, isSubmitting },
  } = useForm<IFormInput>({
    // resolver: yupResolver(schema),
  });




  return (
    <Box backgroundColor='blue.100' h="50vh">
      <Center >
        <Flex backgroundColor="white" mt="5rem" p="5rem" borderRadius="md" border='1px' borderColor='gray.200' >
          <VStack >
            <Heading as='h4' size='md' >
              Login
            </Heading>

            {/* <form onSubmit={handleSubmit(onSubmit)}>
              <Controller
                control={control}
                name="name"
                defaultValue=""
                render={({ field }) => (
                  <FormControl>
                    <FormLabel>Name</FormLabel>
                    <Input {...field} />
                    <FormErrorMessage>{errors?.name?.message}</FormErrorMessage>
                  </FormControl>
                )}
              />
              <Button type="submit" colorScheme='cyan' mt="5" w="full" textColor="white" justifyItems="center">Register</Button>
            </form> */}

            <form onSubmit={
              handleSubmit(onSubmit)
            }>
              {/* <FormControl isRequired>
                <FormLabel mt="3">First Name</FormLabel>
                <Input type="text" {...register('name', { required: true })} />
                <FormErrorMessage>{errors?.firstName?.message}</FormErrorMessage>
              </FormControl>
              <FormControl isRequired>
                <FormLabel mt="3">Last Name</FormLabel>
                <Input type="text" {...register('age', { required: true })} />
                <FormErrorMessage>{errors?.firstName?.message}</FormErrorMessage>
              </FormControl> */}
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


              <Button type="submit" colorScheme='cyan' mt="5" w="full" textColor="white" justifyItems="center" isLoading={submitting} >
                Login
              </Button>
            </form>



          </VStack>
        </Flex>
      </Center>
    </Box>
  );
};




//https://dummyjson.com/users
