
// import { Box, Button, Center, Flex, FormControl, FormErrorMessage, FormLabel, Heading, Input, VStack } from "@chakra-ui/react";
// import React from "react";
// import { useForm, Controller } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as yup from 'yup';

// const schema = yup.object().shape({
//   firstName: yup.string().required('Name is required'),
//   lastName: yup.string().required('Name is required'),
//   age: yup.number().required('Age is required'),
//   //gender: yup.string().email().required('Email is required'),
//   //password: yup.string().required('Password is required'),
// });
// interface IFormInput {
//   firstName: string;
//   lastName: string;
//   age: number,
//   email: string & {
//     readonly __brand: unique symbol;
//     readonly __emailBrand: true;
//   };
//   password: string & {
//     readonly minLength: 8;
//     readonly requiresNumber: true;
//   };

// }

// export const AddUserPage = () => {

//   const {
//     handleSubmit,
//     register,
//     control,
//     formState: { errors, isSubmitting },
//   } = useForm<IFormInput>(({
//     resolver: yupResolver(schema)
//   }));

//   type FormData = yup.InferType<typeof schema>;


//   const onSubmit = (data:FormData) => {
//     console.log(data);
//   };


//   return (
//     <Box>
//        <Box backgroundColor='blue.100' h="50vh">
//       <Center >
//         <Flex backgroundColor="white" mt="5rem" p="5rem" borderRadius="md" border='1px' borderColor='gray.200' >
//           <VStack >
//             <Heading as='h4' size='md' >
//               Add User Info
//             </Heading>



//             <form onSubmit={
//               handleSubmit(onSubmit)
//             }>
//               <FormControl isRequired>
//                 <FormLabel mt="3">First Name</FormLabel>
//                 <Input type="text" {...register('firstName', { required: true })} />
//                 <FormErrorMessage>{errors?.firstName?.message}</FormErrorMessage>
//               </FormControl>
//               <FormControl isRequired>
//                 <FormLabel mt="3">Last Name</FormLabel>
//                 <Input type="text" {...register('lastName', { required: true })} />
//                 <FormErrorMessage>{errors?.firstName?.message}</FormErrorMessage>
//               </FormControl>
//               <FormControl isRequired>
//                 <FormLabel mt="3">Age</FormLabel>
//                 <Input type="numbner" {...register('age', { required: true })}  defaultValue=""/>
//                 <FormErrorMessage>{errors?.email?.message}</FormErrorMessage>
//               </FormControl>
//               <FormControl isRequired>
//                 <FormLabel mt="3">Password</FormLabel>
//                 <Input type="password" {...register('password', { required: true })} />
//                 <FormErrorMessage>{errors?.password?.message}</FormErrorMessage>
//               </FormControl>


//               <Button type="submit" colorScheme='cyan' mt="5" w="full" textColor="white" justifyItems="center" /* isLoading={submitting} */ >
//                 Login
//               </Button>
//             </form>



//           </VStack>
//         </Flex>
//       </Center>
//     </Box>
//     </Box>
//   )
// };
