import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ValidatedTextInput } from "../../../../components/ValidatedInput/ValidatedTextInput";
import "./EditAction.css";
import { EditValidatedTextInput } from '../../../../components/ValidatedInput/EditValidatedTextInput';

interface ActionObjet {
    actionId: number;
    title: string;
    description: string;
    fechaLimite: Date;
    avance: number;
    responsable: string;
    estado: string;
    requirement: number;


}

interface EditActionProps {
    idAction: string;
}

export const EditAccion: React.FC<EditActionProps> = ({ idAction }) => {

    const [actionData, setAtionData] = useState<ActionObjet>({
        actionId: 0,
        title: '',
        description: '',
        fechaLimite: new Date(),
        avance: 0,
        responsable: '',
        estado: '',
        requirement: 0
    });



    let navigate = useNavigate();

    useEffect(() => {
        loadAction();
    }, []);

    const loadAction = async () => {
        try {
            const result = await axios.get(`http://localhost:8080/action/${idAction}`, { headers });
            const actionDataFromApi: ActionObjet = result.data; // Get data directly from API response
            setAtionData(actionDataFromApi);
            console.log(actionData.fechaLimite)

        } catch (error) {
            console.error('Error loading action:', error);
        }
    };


    const token = localStorage.getItem('token');

    const headers = {
        Authorization: `Bearer ${token}`,
    };

 

    const onInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setAtionData({
            ...actionData,
            [name]: value,
        });

    };

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();

        console.log(actionData);
        await axios.put(`http://localhost:8080/action/${actionData?.actionId}`, actionData,{headers });
        navigate("/vencimientos")
    };

    return (
        <div className="crear-accion">
            <h2 className="crear-accion-header">Editar Accion</h2>
            <form className="crear-acciones-form-container" onSubmit={(e) => onSubmit(e)}>
                <div className="crear-acciones-form">
                    <div className="crear-acciones-group">
                        <div className="crear-acciones-unit-1">
                            <EditValidatedTextInput
                                valid={true}
                                name={"title"}
                                label={"Titulo"}
                                changeValue={onInputChange}
                                data={actionData.title}
                            />
                        </div>
                        <div className="crear-acciones-unit-2">
                            <div className='crear-acciones-fecha'>
                                <input
                                    type="date"
                                    className="form-control-fecha"
                                    name="fechaLimite"
                                    value={actionData?.fechaLimite.toString()}
                                    onChange={onInputChange}
                                />
                            </div>
                        </div>
                        <div className="crear-acciones-unit-3">
                            <EditValidatedTextInput
                                valid={true}
                                name={"description"}
                                label={"Descripcion"}
                                changeValue={onInputChange}
                                data={actionData.description}
                            />
                        </div>
                        <div className="crear-acciones-unit-4">
                            <EditValidatedTextInput
                                valid={true}
                                name={"avance"}
                                label={"Avance"}
                                changeValue={onInputChange}
                                data={actionData.avance.toString()}
                            />
                        </div>
                        <div className="crear-acciones-unit-5">
                            <EditValidatedTextInput
                                valid={true}
                                name={"responsable"}
                                label={"Responsable"}
                                changeValue={onInputChange}
                                data={actionData.responsable}
                            />
                        </div>
                        <div className="crear-acciones-unit-6">
                            <EditValidatedTextInput
                                valid={true}
                                name={"estado"}
                                label={"Estado"}
                                changeValue={onInputChange}
                                data={actionData.estado}
                            />
                        </div>
                    </div>
                    <div className="crear-acciones-button">
                        <button type="submit" className="btn btn-primary">
                            Editar Accion
                        </button>
                    </div>
                </div>
            </form>
            <div className="crear-acciones-footer"></div>
        </div>
    );
};