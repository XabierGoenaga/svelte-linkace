
            export let c = ["Email","Password","Confirm Password","Name","Create Account","Full Name","Your full name","At least 8 characters","Re-enter your password","Title","Description","Create Link","Loading...","Failed","Links","Lists","Tags","Settings","Login",["ID: ",0],["Creado: ",0],"Visit Link","Tag Name","Create Tag","Etiquetas","Fecha de creación","URL A-Z","URL Z-A","Titulo A-Z","Titulo Z-A","Oldest A-Z","Newest A-Z","Offset","Limit","No hay links para mostrar.",["Created At: ",0],["Updated At: ",0],"Add Selected Links to List","Links added to the list successfully!","Failed to add links to the list.","Search Email","Search by email","Delete","Edit","Tags (comma separated)","Register","Set Data",null,"Invalid form data","Test","DropDown Option","DropDown Container"]
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
        