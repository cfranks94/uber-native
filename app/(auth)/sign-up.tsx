import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import OAuth from "@/components/OAuth";
import { icons, images } from "@/constants";
import { fetchAPI } from "@/lib/fetch";
import { useSignUp } from "@clerk/clerk-expo";
import { Link, router } from "expo-router";
import { useState } from "react";
import { View, Text, ScrollView, Image, Alert } from "react-native";
import { ReactNativeModal } from "react-native-modal";

const SignUp = () => {
    const { isLoaded, signUp, setActive } = useSignUp();
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: ""
    });
    const [verification, setVerification] = useState({
        state: 'default',
        error: '',
        code: ''
    });

    const onSignUpPress = async () => {
        if (!isLoaded) return
    
        // Start sign-up process using email and password provided
        try {
          await signUp.create({
            emailAddress: form.email,
            password: form.password,
          })
    
          // Send user an email with verification code
          await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })
    
          setVerification({
            ...verification,
            state: 'pending'
          })
        } catch (err: any) {
          Alert.alert('Error', err.errors[0].longMessage)
        }
    }
    
    const onVerifyPress = async () => {
        if (!isLoaded) return;
    
        try {
          const signUpAttempt = await signUp.attemptEmailAddressVerification({  
            code: verification.code,
          })
    
          // If verification was completed
          if (signUpAttempt.status === 'complete') {
            await fetchAPI('/(api)/user', {
                method: 'POST',
                body: JSON.stringify({
                    name: form.name,
                    email: form.email,
                    clerkId: signUpAttempt.createdUserId
                })
            })

            await setActive({ session: signUpAttempt.createdSessionId })
            setVerification({
                ...verification,
                state: 'success'
            })
          } else {
            setVerification({
                ...verification,
                state: 'failed',
                error: 'Verification failed'
            })
          }
        } catch (err: any) {
            setVerification({
                ...verification,
                state: 'failed',
                error: err.errors[0].longMessage
            })
        }
    }

    return (
        <ScrollView className="flex-1 bg-white">
            <View className="flex-1 bg-white">
                <View className="relative w-full h-[250px]">
                    <Image 
                        source={images.signUpCar}
                        className="z-0 w-full h-[250px]"
                    />
                    <Text className="text-2xl text-black font-JakartaSemiBold absolute bottom-5 left-5">Create Your Account</Text>
                </View>
                <View className="p-5">
                    <InputField 
                        label="Name"
                        placeholder="Enter your name"
                        icon={icons.person}
                        value={form.name}
                        onChangeText={(value) => {
                            setForm({
                                ...form,
                                name: value
                            })
                        }}
                    />
                    <InputField 
                        label="Email"
                        placeholder="Enter your email"
                        icon={icons.email}
                        value={form.email}
                        onChangeText={(value) => {
                            setForm({
                                ...form,
                                email: value
                            })
                        }}
                    />
                    <InputField 
                        label="Password"
                        placeholder="Enter your password"
                        icon={icons.lock}
                        value={form.password}
                        secureTextEntry={true}
                        onChangeText={(value) => {
                            setForm({
                                ...form,
                                password: value
                            })
                        }}
                    />

                    <CustomButton
                        title="Sign Up"
                        onPress={onSignUpPress}
                        className="mt-6"
                    />

                    <OAuth />

                    <Link href="/sign-in" className="text-lg text-center text-general-200 mt-10">
                        <Text>Already have an account? </Text>
                        <Text className="text-primary-500">Log In</Text>
                    </Link>
                </View>

                <ReactNativeModal isVisible={verification.state === 'pending'} onModalHide={() => setVerification({
                    ...verification,
                    state: 'success'
                })}>
                    <View className="bg-white px-7 py-9 rounded-2xl">
                        <Text className="text-2xl font-JakartaExtraBold mb-2">
                            Verification
                        </Text>
                        <Text className="font-Jakarta mb-5">
                            We've sent a verification code to {form.email}
                        </Text>
                        <InputField 
                            label="Code"
                            icon={icons.lock}
                            placeholder="12345"
                            value={verification.code}
                            keyboardType="numeric"
                            onChangeText={(code) => setVerification({...verification, code})}
                        />

                        {verification.error && (
                            <Text className="text-red-500 text-sm mt-1">
                                {verification.error}
                            </Text>
                        )}

                        <CustomButton 
                            title="Verify Email"
                            onPress={onVerifyPress}
                            className="mt-5 bg-success-500"
                        />
                    </View>
                </ReactNativeModal>

                <ReactNativeModal isVisible={verification.state === 'success'}>
                    <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
                        <Image source={images.check} className="w-[110px] h-[110px] mx-auto my-5" />

                        <Text className="text-3xl font-JakartaBold text-center">
                            Verified
                        </Text>
                        <Text className="text-base text-gray-400 font-Jakarta text-center mt-2">
                            You have successfully verified your account
                        </Text>

                        <CustomButton 
                            title="Browse Home"
                            className="mt-5"
                            onPress={() => {
                                router.replace('/(root)/(tabs)/home')
                            }}
                        />
                    </View>
                </ReactNativeModal>
            </View>
        </ScrollView>
    )
}

export default SignUp;