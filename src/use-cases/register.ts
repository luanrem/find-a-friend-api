import { prisma } from '@/lib/prisma'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
  cep?: null | string
  address?: null | string
  whatsapp: string
}

export async function registerUseCase({
  name,
  email,
  password,
  cep,
  address,
  whatsapp,
}: RegisterUseCaseRequest) {
  await prisma.org.create({
    data: {
      name,
      email,
      password_hash: password,
      cep,
      address,
      whatsapp,
    },
  })
}
