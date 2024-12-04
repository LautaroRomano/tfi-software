import {Button} from "@/components/ui/button";
import { Separator } from "@/components/ui/separator"
import {HealthcareMember} from "@/Models/HealthcareMember/HealthcareMember";
import Image from "next/image";







export default function Home() {

    const healthCareMembers: HealthcareMember[] = [{
        icon: '/assets/icons/users.png', // Ruta de la imagen
        numberOfMembers: '+100',
        description: 'Profesionales Conectados',
    }, {
        icon: './assets/icons/clinical.png', // Otra ruta de imagen
        numberOfMembers: '+50',
        description: 'Clínicas Activas',
    }];



    return (
        <>
            <header className="flex flex-row justify-between items-center  px-12 py-4">
                <div className={'flex flex-row items-center'}>
                    <Image
                        src="/assets/icons/iconLogo.png"
                        alt="Logo Icon"
                        width={24}
                        height={24}
                        className="object-contain h-10 w-10"
                        layout="fixed"
                    />
                    <h1 className={'px-2 font-bold text-4xl'}>Medical Clinic</h1>
                </div>
            </header>

            <main className="flex flex-col  h-screen p-12 justify-around">
                <div className={'flex h-2/5  justify-around items-center'}>
                    <div className={''}>
                        <h2 className={'text-5xl font-bold'}>Medical Clinic</h2>
                        <h2 className={'text-4xl font-bold'}>Tu Espacio Profesional</h2>
                        <p className={'text-lg text-start py-4'}>Organiza y potencia el seguimiento de las evoluciones
                            de tus pacientes,
                            manteniendo toda la información relevante en un solo lugar para facilitar tu práctica
                            médica.</p>
                    </div>
                    <div className="relative w-full h-[400px]">
                        <Image
                            src="/assets/images/backgroundLanding.png"
                            alt="background image"
                            layout="fill"
                            className="object-cover"
                        />
                    </div>
                </div>

                <div
                    className="flex flex-row h-1/5 w-3/4 mx-auto rounded-2xl bg-white shadow-2xl items-center justify-around ">
                    {healthCareMembers.map((item, index) => (
                        <div key={index} className="flex-1 flex flex-col items-center justify-center p-4">
                            <div className="flex flex-row items-center mb-2">
                                <img src={item.icon} alt={`Ícono de ${item.description}`} className="w-10 h-9 mr-2" />
                                <p className="text-3xl text-customBlue font-semibold">{item.numberOfMembers}</p>
                            </div>
                            <p className="text-center pt-4">{item.description}</p>
                            {index === 0 && (
                                <Separator orientation={'vertical'}/>
                            )}
                        </div>
                    ))}
                </div>


            </main>

        </>
    );
}
