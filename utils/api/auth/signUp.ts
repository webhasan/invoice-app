const apiEndPoint = process.env.apiEndPoint + '/register';


export type SignupData = {
    name: string;
    email: string; 
    password: string;
    confirmPassword: string;
}

type CreateUserResponse = {
    user_id: string;
}

export const SignUp = async (data: SignupData): Promise<CreateUserResponse> => {

    const res = await fetch(apiEndPoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });

    if(res.ok) {
       return res.json();
    }

    throw await res.text()
}
