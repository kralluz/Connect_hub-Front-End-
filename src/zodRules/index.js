import { z } from "zod";

export const zodRules = z.object({
    name: z.string().nonempty("Nome é obrigatório."),
    email: z
        .string()
        .nonempty("E-mail é obrigatório.")
        .email("Forneça um e-mail válido."),
    password: z
        .string()
        .nonempty("Senha é obrigatória")
        .min(8, "A senha precisa ter no mínimo oito caracteres.")
        .regex(
            /(?=.*?[A-Z])/,
            "A senha deve ter pelo menos uma letra maiúscula."
        )
        .regex(
            /(?=.*?[a-z])/,
            "A senha deve ter pelo menos uma letra minúscula."
        )
        .regex(/(?=.*?[0-9])/, "A senha deve ter pelo menos um número."
        )
        .regex(
            /(?=.*?[!@#$%^&*()_+[\]{};':"\\|,.<>/?])/,
            "A senha deve ter pelo menos um caractere especial."
        ),
    confirmPassword: z
        .string()
        .nonempty("A confirmação senha deve idêntica a senha."),
    contact: z
        .string()
        .nonempty("Número para contato é obrigatório")
        .regex(/^\d+$/, "Insira apenas números no campo de contato")
        .min(8, "O número de contato precisa ter pelo menos 8 dígitos")
    });
