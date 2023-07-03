import { env } from "@/env"
import axios from "axios"

interface BrasilAPIResponse {
  cep: string
  state: string
  city: string
  neighborhood: string
  street: string
  service: string
}

export async function SearchCityByCep(cep: string): Promise<BrasilAPIResponse> {
  const response = await axios.get(`${env.CEP_API}${cep}`)

  if (!response.data) {
    throw new Error('Return a valid CEP.')
  }

  return response.data
}