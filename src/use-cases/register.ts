import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'

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
  const orgAlreadyExists = await prisma.org.findUnique({
    where: {
      email,
    },
  })

  if (orgAlreadyExists) {
    throw new Error('Organization already exists!')
  }

  const password_hash = await hash(password, 6)

  await prisma.org.create({
    data: {
      name,
      email,
      password_hash,
      cep,
      address,
      whatsapp,
    },
  })
}
