from nicegui import ui
##libreria
ui.label("hola mundo!")
# etiqueta
ui.button("haz click en el boton",on_click=lambda:ui.notify("boton clickleado!"))
#boton / click/notificacion
ui.run()