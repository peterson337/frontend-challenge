import { useRef, useState } from "react";

export function useCadastroForm() {
  const nomeRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const confirmEmailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleStartCourse = () => {
    const nome = nomeRef.current?.value || "";
    const email = emailRef.current?.value || "";
    const confirmEmail = confirmEmailRef.current?.value || "";
    const password = passwordRef.current?.value || "";
    const confirmPassword = confirmPasswordRef.current?.value || "";

    if (!nome || !email || !confirmEmail || !password || !confirmPassword) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Por favor, insira um e-mail válido.");
      return;
    }

    if (email !== confirmEmail) {
      alert("Os e-mails não conferem.");
      return;
    }

    if (password.length < 8) {
      alert("A senha deve ter 8 caracteres.");
      return;
    }

    if (password !== confirmPassword) {
      alert("As senhas não conferem.");
      return;
    }

    console.log("Formulário validado com sucesso!");
    console.log("Nome:", nome);
    console.log("Email:", email);
    console.log("confirmEmail:", confirmEmail);
    console.log("Senha:", password);
    console.log("confirmPasswordRef:", confirmPasswordRef.current?.value);

    // Esconde o formulário exibindo fragment 
    // setIsSubmitted(true);
  };

  return {
    nomeRef,
    emailRef,
    confirmEmailRef,
    passwordRef,
    confirmPasswordRef,
    isSubmitted,
    handleStartCourse,
  };
}
