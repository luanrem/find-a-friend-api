import { Prisma, AdoptionRequirement } from "@prisma/client";
import { AdoptionRequirementRepository } from "../adoption-requirement-repository";


export class InMemoryAdoptionRequirementRepository implements AdoptionRequirementRepository {
  create(data: Prisma.AdoptionRequirementUncheckedCreateInput): Promise<AdoptionRequirement> {
    throw new Error("Method not implemented.");
  }

}