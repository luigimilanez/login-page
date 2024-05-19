import React, { useEffect, useState } from "react"
import styled from "styled-components"

const StyleButton = styled.button`
    padding: 4px 12px;
    width: 17.2rem;
    height: 2.1rem;
    font-weight: bold;
    background-color: ${props => props.disabled ? '#57a7e7' : '#2272B4'};;
    border: none;
    color: #e9e9e9;
    border-radius: 4px;
    cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
`

const Error = styled.span`
    color: #c82d4c;
    font-size: 12px;
    font-weight: bold;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
`

const LoadingIcon = styled.img`
    width: 25px;
    height: 25px;
`;

const styleInput = {
    padding: "5px 12px",
    width: "16rem",
    height: "1.5rem",
    outlineColor: "#2272B4",
    border: "1px solid #D1D9E1",
    borderRadius: "4px"
}

export default function Login() {

    useEffect(() => {
        document.title = "Financeiro | Login"
    })


    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isEmailValid, setIsEmailValid] = useState(true)
    const [isPasswordValid, setIsPasswordValid] = useState(true)
    const [isLoading, setIsLoading] = useState(false)

    const [erroApi, setErroApi] = useState("")

    // Status Error
    useEffect(() => {
        if (email.length != 0) {
            validaEmail(email)
        } 

        if ((password.length != 0 && password.length < 6)) {
            validaSenha(password)
        } else {
            setIsPasswordValid(true)
        }

    }, [email, password])

    const validaEmail = (email) => {
        const emailRegex = /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/    
        setIsEmailValid(emailRegex.test(email))    
    }
    
    const validaSenha = (password) => {
        setIsPasswordValid(password.length >= 6)
    }

    const MontaEnviaRequest = () => {
        const json = {"email": email, "password": password}
        console.log(json)

        setIsLoading(true)
        setErroApi("")

        setTimeout(() => {
            setIsLoading(false)

            // If status code retorno == 403
            setErroApi("Email ou senha incorretos")  // Puxar a mensagem da API
            
            setEmail("")
            setPassword("")

            console.log("Ocorreu um erro!")

            // Else 
            // Redirecionar para a home
        }, 10000)
        
    }

    return(
        <div style={{backgroundColor: "rgba(246, 247, 249)", display: "flex", justifyContent: "center", height: "100vh", alignItems: "center"}}>
            <div style={{display: "flex", justifyContent: "center", width: "25rem", height: "25rem", backgroundColor: "#ffffff", borderRadius: "8px", boxShadow: "rgba(46, 56, 64, 0.12) 0px 4px 16px"}}>
                
                <div>
                    <div style={{width: "100%", height: "120px", display: "flex", justifyContent: "center", marginTop: "1.5rem"/*, display: "flex", justifyContent: "center"*/}}>
                        <img src="logo.png" alt="logo" />
                    </div>
                    
                    <form onSubmit={(e) => {e.preventDefault(); e.stopPropagation()}} >

                        {erroApi && <div style={{marginTop: "-25px", display: "flex", justifyContent: "center", position: "absolute", width: "16.9rem", backgroundColor: "#fff5f7", padding: "2px 5px", border: "1px solid #fbd0d8", borderRadius: "4px"}}><Error>{erroApi}</Error></div>}
                        <div style={{marginTop: "1.8rem"}}>    
                            <input 
                                type="email"
                                style={{...styleInput, border: !isEmailValid ? "1px solid #c82d4c" : styleInput.border}} 
                                value={email} 
                                onChange={(event) => setEmail(event.target.value)} 
                                placeholder="Email"
                                autoComplete="email" />
                                {!isEmailValid && <div style={{position: "absolute", marginLeft: "2px"}}><Error>Email inválido</Error></div>}
                            </div>

                        <div style={{marginTop: "2rem"}}>
                            <input 
                                type="password"
                                style={{...styleInput, border: !isPasswordValid ? "1px solid #c82d4c" : styleInput.border}}
                                value={password} 
                                onChange={(event) => setPassword(event.target.value)} 
                                placeholder="Senha" />
                                {!isPasswordValid && <div style={{position: "absolute", marginLeft: "2px"}}><Error>Senha deve ter pelo menos 6 caracteres</Error></div>}
                            </div>

                        <div style={{display: "flex", justifyContent: "center", color: "#ffffff", marginTop: "2.5rem"}}>
                            <StyleButton onClick={MontaEnviaRequest} disabled={isLoading || !(email.trim().length !== 0 && password.trim().length !== 0 && isEmailValid && isPasswordValid)} >{isLoading ? <LoadingIcon src="loading.gif" alt="loading..." /> : "Login"}</StyleButton>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    )
}