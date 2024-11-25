import { InputFieldProps } from "@/types/type";
import { KeyboardAvoidingView, Text, TouchableWithoutFeedback, View, Image, TextInput, Platform } from "react-native";

const InputField = ({ 
    label, 
    labelStyle, 
    icon, 
    secureTextEntry = false, 
    containerStyle, 
    inputStyle, 
    iconStyle, 
    className, 
    ...props 
}: InputFieldProps) => (
        <View className="my-2 w-full">
            <Text className={`text-lg font-JakartaSemiBold mb-3 ${labelStyle}`}>{label}</Text>
            <View className={`flex flex-row justify-start items-center relative bg-neutral-100 rounded-full border border-neutral-100 focus:border-primary-500 ${containerStyle}`}>
                {icon && <Image source={icon} className={`w-6 h-6 ml-4 ${iconStyle}`} />}
                <TextInput 
                    className={`rounded-full p-4 font-JakartaSemiBold text-[15px] flex-1 text-left ${inputStyle}`}
                    secureTextEntry={secureTextEntry}
                    {...props}
                />
            </View>
        </View>
)

export default InputField;