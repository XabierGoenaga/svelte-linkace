
            export let c = ["Correo electrónico","Contraseña","Confirmar contraseña","Create Account","Full Name","Your full name","At least 8 characters","Re-enter your password","Todos los Errores","Datos","Change Data>","Change Data","Create Data"]
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
        