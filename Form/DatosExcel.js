document.getElementById('btnExportar').addEventListener('click', function(event) {
    event.preventDefault(); // Evita que el formulario se envíe y recargue la página
    
    // Obtén los valores de los campos del formulario
    let usuario = document.getElementById('usuario').value;
    let nombre = document.getElementById('nombre').value;
    let password = document.getElementById('password').value;
    let password2 = document.getElementById('password2').value;
    let correo = document.getElementById('correo').value;
    let telefono = document.getElementById('telefono').value;
    let terminos = document.getElementById('terminos').checked ? "Aceptado" : "No aceptado";

    // Crea los nuevos datos que se añadirán en Excel
    let nuevosDatos = [
        ["Usuario", usuario],
        ["Nombre", nombre],
        ["Contraseña", password],
        ["Repetir Contraseña", password2],
        ["Correo Electrónico", correo],
        ["Teléfono", telefono],
        ["Términos y Condiciones", terminos]
    ];

    // Leer el archivo Excel existente
    let reader = new FileReader();
    let fileInput = document.getElementById('fileInput'); // Input para seleccionar el archivo Excel

    fileInput.addEventListener('change', function(e) {
        let file = e.target.files[0];
        
        reader.readAsBinaryString(file);
        reader.onload = function(e) {
            let data = e.target.result;
            let workbook = XLSX.read(data, {type: 'binary'});

            // Obtener la hoja de trabajo existente (o crear una si no existe)
            let sheetName = "DatosFormulario";
            let ws = workbook.Sheets[sheetName] || XLSX.utils.aoa_to_sheet([]);
            
            // Convierte la hoja en una matriz de datos (array of arrays)
            let existingData = XLSX.utils.sheet_to_json(ws, {header: 1});
            
            // Añade los nuevos datos al final
            nuevosDatos.forEach(row => existingData.push(row));

            // Actualiza la hoja con los datos nuevos
            let newWs = XLSX.utils.aoa_to_sheet(existingData);
            workbook.Sheets[sheetName] = newWs;

            // Genera el archivo Excel actualizado y lo descarga
            XLSX.writeFile(workbook, 'DatosFormulario.xlsx');
        };
    });
    
    // Simula el clic en el input para seleccionar el archivo Excel
    fileInput.click();
});
