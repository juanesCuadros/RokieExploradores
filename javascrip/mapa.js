$(document).ready(function () {
    $('#infoModal').modal('show');

    // Mostrar el mapa al hacer clic en el botón "Aceptar"
    $('#acceptButton').on('click', function () {
        // Ocultar el modal
        $('#infoModal').modal('hide');
        
        // Mostrar el mapa
        $('#map').show();

        // Inicializar el mapa en una ubicación por defecto (puedes cambiar estas coordenadas si es necesario)
        var map = L.map("map", {
            center: [2.442, -76.606],
            zoom: 15,
            zoomControl: true,
        });

        var tileLayer = L.tileLayer(
            "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
            {"attribution": "&copy; OpenStreetMap contributors", "maxZoom": 19}
        ).addTo(map);

        // Añadir marcadores predefinidos
        var nodes = [
            {"name": "El Morro de Tulcán", "location": [2.444712, -76.600737], "image": "../img/morro.jpg", "completed": false},
            {"name": "Cerro las Tres Cruces", "location": [2.440586, -76.594717], "image": "../img/TresCruces360.jpg", "completed": false},
            {"name": "Parque Caldas", "location": [2.441873, -76.606356], "image": "../img/ParqueCaldas360.jpg", "completed": false},
        ];        

        nodes.forEach(function(node) {
            L.marker(node.location)
                .addTo(map)
                .bindPopup(node.name + '<br><button class="image-button" data-image="' + node.image + '">Ver Imagen 360</button>');
        });

        // Manejar clic en el botón para ver la imagen panorámica
        $(document).on('click', '.image-button', function() {
            var imageUrl = $(this).data('image');
            
            // Ocultar el mapa y mostrar el contenedor de la imagen panorámica y el botón de volver al mapa
            $('#map').hide();
            $('#panorama').show();
            $('#backToMap').show();
            $('#missionsPanel').show();  // Mostrar el panel de misiones

            // Iniciar el visor panorámico
            pannellum.viewer('panorama', {
                "type": "equirectangular",
                "panorama": imageUrl,
                "autoLoad": true,
                "showZoomCtrl": true, // Control de zoom activado
                "compass": true, // Mostrar la brújula
                "autoRotate": -2, // Rotar automáticamente en sentido antihorario
                "hfov": 110,   // Campo de visión ajustado
                "pitch": 0,    // Ajuste vertical inicial
                "yaw": 0,      // Ajuste horizontal inicial
                "minHfov": 50,
                "maxHfov": 120
            });
        });

        // Manejar clic en el botón "Volver al Mapa"
        $('#backToMap').on('click', function() {
            // Ocultar el visor panorámico, el panel de misiones y el botón, y volver a mostrar el mapa
            $('#panorama').hide();
            $('#backToMap').hide();
            $('#missionsPanel').hide();  // Ocultar el panel de misiones
            $('#map').show();
        });

        // Manejar clic en el botón para cerrar el panel de misiones
        $('#closeMissionsPanel').on('click', function() {
            $('#missionsPanel').hide();
        });

        // Función para verificar si todas las casillas están marcadas
        function checkAllMissionsCompleted() {
            var allChecked = true;
            $('.mission-checkbox').each(function () {
                if (!$(this).is(':checked')) {
                    allChecked = false;
                }
            });

            // Habilita o deshabilita el botón según el estado de las casillas
            $('#unlockButton').prop('disabled', !allChecked);
            $('#unlockButton').toggleClass('enabled', allChecked); // Cambiar el color del botón
        }

        // Evento para verificar el estado de las casillas
        $('.mission-checkbox').on('change', function () {
            checkAllMissionsCompleted();
        });

        // Manejar clic en el botón "Completar"
        $('#unlockButton').on('click', function() {
            // Sumar puntos
            puntos += 100;
            document.getElementById('pointsDisplay').textContent = 'Puntos: ' + puntos;

            // Habilitar el botón de completar y cambiar su color
            $('#unlockButton').prop('disabled', false).addClass('enabled');

            // Desmarcar todos los checkboxes
            $('.mission-checkbox').prop('checked', false);
            
            // Mostrar modal de felicitaciones
            const congratsModal = new bootstrap.Modal(document.getElementById('congratsModal'));
            congratsModal.show();
            
            setTimeout(function() {
                congratsModal.hide(); // Cerrar el modal
                $('#panorama').hide(); // Ocultar el visor panorámico si está visible
                $('#missionsPanel').hide(); // Ocultar el panel de misiones si está visible
                $('#map').show(); // Mostrar el mapa
            }, 2000); // 2000 ms = 2 segundos

            // Deshabilitar el botón de completar y quitar el color verde
            $(this).prop('disabled', true).removeClass('enabled');
        });
    });

    const username = localStorage.getItem('username') || 'Invitado'; // Si no hay usuario, mostrar "Invitado"
        
    // Mostrar el nombre de usuario en el encabezado
    document.getElementById('usernameDisplay').textContent = 'Usuario: ' + username;

    // Puedes actualizar los puntos dinámicamente más adelante usando:
    let puntos = 0;
    document.getElementById('pointsDisplay').textContent = 'Puntos: ' + puntos;
});
