
            export let c = ["Correo electrónico","Contraseña","Confirmar contraseña","Create Account","Full Name","Your full name","At least 8 characters","Re-enter your password","Create Data","Title","Description","Create Link","Loading...","Failed","Links","Lists","Tags","Settings","Login",["Creado: ",0],"Abrir enlace en nueva pestaña","Visit Link","Tag Name","Create Tag","Invalid form data"]
            // only during dev, for HMR
            let latestVersion = -1
            // @ts-ignore
            export function update({ version, data }) {
                if (latestVersion >= version) {
                    return
                }
                for (const [ index, item ] of data['es'] ?? []) {
                    c[index] = item
                }
                latestVersion = version
            }
        