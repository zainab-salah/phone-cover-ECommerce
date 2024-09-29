"use server";

import { db } from "@/db";
import {
    CaseColor,
    CaseFinish,
    CaseMaterial,
    PhoneModel,
  
  } from "@prisma/client";

export type DesignArgs = {
    color: CaseColor;
    finish: CaseFinish;
    model: PhoneModel;
    material: CaseMaterial;
    configId: string;
  };
//rpc a remote procedure call
export async function saveConfig({
  color,
  finish,
  model,
  configId,
  material,
}: DesignArgs) {
  await db.configurations.update({
    where: { id: configId },
    data: { color, finish, model, material },
  });
}
