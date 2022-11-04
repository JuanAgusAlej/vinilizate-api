const express = require("express");
const cartRouter = express.Router();
const { Cart } = require("../models");




cartRouter.post("/", (req,res)=> {        //ruta para agregar un producto al carrito
Cart.create(req.body).then((car)=> res.status(201).send(car))
})

cartRouter.delete("/:id", (req,res)=> {      //ruta para eliminar un producto del carrito 
    const id= req.params.id
    Cart.destroy({where:{id}}).then(()=> res.status(200).send("Producto eliminado"))

    })

    cartRouter.put("/:id",  (req, res, next) => {       // ruta para editar la cantidad del producto del carrito 
        const id = req.params.id
        const {products} = req.body
        try {
            const updated = Cart.update({ products }, { where: { id } })
            res.status(201).send(updated[1])
        }
        catch (e) { res.status(503).end() }
      })




module.exports= cartRouter