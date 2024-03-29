import {
  modalTutoresState,
  modalVacinasState,
  typeRequestTutores,
} from "@/src/atoms/modalAtom";
import MuiModal from "@mui/material/Modal";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import Box from "@mui/material/Box";

import { blue } from "@mui/material/colors";
import { useForm } from "react-hook-form";
import { Tutores } from "@/typing";
import axios from "axios";

function ModalTutores(props: any) {
  const idTutor = props.tutorData.id;
  const tutorData = props.tutorData;
  const [showModal, setShowModal] = useRecoilState(modalTutoresState);

  const typeRequestTutor = useRecoilValue(typeRequestTutores);

  const handleClose = () => {
    setShowModal(false);
  };

  let requestFunction: any;

  let defaultValues;

  switch (typeRequestTutor) {
    case "POST": {
      requestFunction = postTutores;
      break;
    }
    case "PUT": {
      defaultValues = tutorData;
      requestFunction = updateTutores;
      break;
    }
    default: {
    }
  }

  const { register, handleSubmit, formState } = useForm<Tutores>({
    defaultValues: {
      id: defaultValues?.id,
      nome: defaultValues?.nome,
      email: defaultValues?.email,
      celular: defaultValues?.celular,
      dataNascimento: defaultValues?.dataNascimento,
      cep: defaultValues?.cep,
      password: defaultValues?.password,
    },
  });

  async function onSubmit(data: Tutores, e: any) {
    e.preventDefault();
    data.id = idTutor;
    requestFunction(data);
    setShowModal(false);
  }

  async function updateTutores(data: any) {
    const { id, nome, email, celular, dataNascimento, cep, password } = data;
    await axios.put(`${process.env.NEXT_PUBLIC_API_HOST}/tutores`, {
      id,
      nome,
      email,
      celular,
      dataNascimento,
      cep,
      password,
    });
    // .then( () => {
    //   alertService.success('Vacina alterada.', {
    //     keepAfterRouteChange: true,
    //   })
    // })
  }
  async function postTutores(data: any) {
    const { nome, email, celular, dataNascimento, cep, password } = data;
    await axios.post(`${process.env.NEXT_PUBLIC_API_HOST}/tutores`, {
      nome,
      email,
      celular,
      dataNascimento,
      cep,
      password,
    });

    // .then( () => {
    //   alertService.success('Vacina alterada.', {
    //     keepAfterRouteChange: true,
    //   })
    // })
  }

  return (
    <MuiModal
      open={showModal}
      onClose={handleClose}
      className="fixed !top-7 left-0 right-0 z-50 mx-auto max-w-2xl overflow-hidden  rounded"
    >
      <>
        <div className="space-x-16 rounded-b-md bg-gray-100 px-4 py-4">
          <div className="space-y-4 text-lg">
            {/*header*/}
            <div className="flex items-start justify-between pb-2  border-b border-solid border-blueGray-200 rounded-t">
              <h3 className="text-xl font-semibold text-gray-600">
                Alteração dos dados do Tutor
              </h3>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-gray-600   float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => handleClose()}
              >
                <span className="bg-transparent text-gray-600  h-6 w-6 text-2xl block outline-none focus:outline-none">
                  ×
                </span>
              </button>
            </div>

            <div className="flex flex-col gap-x-10 gap-y-4 font-light md:flex-row">
              <div className="flex flex-col space-y-3 text-sm">
                <section className="px-0">
                  <Box
                    sx={{
                      flexGrow: 1,
                      bgcolor: "background.paper",
                      height: 500,
                      width: "100%",
                    }}
                  >
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="grid grid-cols-1 gap-4 mt-0 sm:grid-cols-1 p-8">
                        <div className="col-span-2 ">
                          <label className="text-principal dark:text-gray-500 font-normal text-sm">
                            Nome do Tutor
                          </label>

                          <input
                            type="text"
                            className="block h-8 w-full  text-gray-700 bg-white border border-gray-300 rounded dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                            {...register("nome")}
                            required
                          />
                        </div>

                        <div>
                          <label className="text-principal dark:text-gray-400 font-normal text-sm">
                            Email
                          </label>

                          <input
                            type="text"
                            className="block h-8 w-full  text-gray-700 bg-white border border-gray-300 rounded dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                            {...register("email")}
                            required
                          />
                        </div>
                        <div>
                          <label className="text-principal dark:text-gray-400 font-normal text-sm">
                            Senha
                          </label>

                          <input
                            type="password"
                            className="block h-8 w-full  text-gray-700 bg-white border border-gray-300 rounded dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                            {...register("password")}
                            required
                          />
                        </div>

                        <div>
                          <label className="text-principal dark:text-gray-400 font-normal text-sm">
                            Data de Nascimento
                          </label>

                          <input
                            type="date"
                            className="block h-8 w-full  text-gray-700 bg-white border border-gray-300 rounded dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                            {...register("dataNascimento")}
                            required
                          />
                        </div>
                        <div className="col-span-2 ">
                          <label className="text-principal dark:text-gray-400  font-normal text-sm">
                            Celular
                          </label>

                          <input
                            type="tel"
                            className="block h-8 w-full  text-gray-700 bg-white border border-gray-300 rounded dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                            {...register("celular")}
                            required
                          />
                        </div>

                        <div className="col-span-2 ">
                          <label className="text-principal dark:text-gray-400  font-normal text-sm">
                            CEP
                          </label>

                          <input
                            type="text"
                            className="block h-8 w-full  text-gray-700 bg-white border border-gray-300 rounded dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                            {...register("cep")}
                            required
                          />
                        </div>
                      </div>

                      {/*footer*/}
                      <div className="flex items-center justify-end  pt-4 border-t border-solid border-blueGray-200 gap-4 rounded-b p-4">
                        <button
                          className="flex-1 px-6 py-2 font-semibold select-none rounded-md text-gray-800 border border-gray-500 bg-transparent hover:bg-gray-50"
                          onClick={() => setShowModal(false)}
                        >
                          Cancelar e Sair
                        </button>

                        <button
                          className="flex-1 px-6 py-2 font-semibold select-none rounded-md text-white bg-gray-600 hover:bg-gray-400"
                          type="submit"
                        >
                          {" "}
                          Salvar alterações
                        </button>
                      </div>
                      {}
                    </form>
                  </Box>
                </section>
              </div>
            </div>
          </div>
        </div>
      </>
    </MuiModal>
  );
}

export default ModalTutores;
