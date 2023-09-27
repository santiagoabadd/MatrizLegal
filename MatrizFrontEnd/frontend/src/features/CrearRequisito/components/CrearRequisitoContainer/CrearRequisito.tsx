import React from "react";
import "./CrearRequisito.css";
import { ValidatedTextInput } from "../../../../components/ValidatedInput/ValidatedTextInput";

export const CrearRequisito: React.FC = () => {
  return (
    <div className="crear-requisito">
      <h2 className="crear-requisito-header">Crear un nuevo requisito</h2>
      <div className="crear-requisitos-form">
        <div className="crear-requisitos-group">
          <ValidatedTextInput
            valid={true}
            name={"titulo"}
            label={"Titulo"}
            changeValue={() => {}}
          />
          <ValidatedTextInput
            valid={true}
            name={"estadoActual"}
            label={"Estado actual"}
            changeValue={() => {}}
          />
          <ValidatedTextInput
            valid={true}
            name={"requisito"}
            label={"Requisito"}
            changeValue={() => {}}
          />
        </div>
        <div className="crear-requisitos-group">
          <ValidatedTextInput
            valid={true}
            name={"cumplimiento"}
            label={"Cumplimiento"}
            changeValue={() => {}}
          />
          <ValidatedTextInput
            valid={true}
            name={"relevancia"}
            label={"Relevancia"}
            changeValue={() => {}}
          />
        </div>
        <div className="crear-requisitos-group">
          <ValidatedTextInput
            valid={true}
            name={"cliente"}
            label={"Cliente"}
            changeValue={() => {}}
          />
          <ValidatedTextInput
            valid={true}
            name={"categoria"}
            label={"Categoria"}
            changeValue={() => {}}
          />
          <ValidatedTextInput
            valid={true}
            name={"planta"}
            label={"Planta"}
            changeValue={() => {}}
          />
        </div>
      </div>
      <div className="crear-requisitos-footer"></div>
    </div>
  );
};
