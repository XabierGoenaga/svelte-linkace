
            export let c = ["Email","Password","Confirm Password","Create Account","Full Name","Your full name","At least 8 characters","Re-enter your password","Create Data","Title","Description","Create Link","Loading...","Failed","Links","Lists","Tags","Settings","Login",["Creado: ",0],"Visit Link","Tag Name","Create Tag","Etiquetas","Fecha de creación","URL A-Z","URL Z-A","Titulo A-Z","Titulo Z-A","Oldest A-Z","Newest A-Z","Offset","Limit","Invalid form data"]
            // only during dev, for HMR
            let latestVersion = -1
            // @ts-ignore
            export function update({ version, data }) {
                if (latestVersion >= version) {
                    return
                }
                for (const [ index, item ] of data['en'] ?? []) {
                    c[index] = item
                }
                latestVersion = version
            }
        