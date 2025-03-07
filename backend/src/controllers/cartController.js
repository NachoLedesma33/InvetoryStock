import * as cartServices from "../services/cartServices.js";

const cartController = {
    getActiveCart: async(req, res, next) =>{

        try{
            const {userId} = req.params
            const cart = await cartServices.getActiveCart(userId)
            res.status(200).json(cart)
        }catch(error){
            res.status(404).json({message: "Error en obtener el carrito para el usario" + req.params.userId})
            console.log("Error al econtrar el carrito activo para el usario" + req.params.userId)
            next(error);}
    },
    getUserCart: async (req, res, next) => {
        try{
            const {userId} = req.params
            const cart = await cartServices.getUserCart(userId)
            res.status(200).json(cart)
        }catch(error){
            res.status(404).json({message: "Error en obtener el carrito para el usario" + req.params.userId})
            console.log("Error al econtrar el carrito para el usario" + req.params.userId)
            next(error);
        }
    },
    addToCart: async(rq, res, next) => {
        try{
            const {userId} = req.params
            const cart = await cartServices.addToCart(userId, req.body)
            res.status(200).json(cart)
        }catch(error){
            res.status(500).json({message: "Error al agregar el producto al carrito" + req.params.userId})
            console.log("Error al agregar el producto al carrito" + req.params.userId)
            next(error);
        }
    },
    updateCartItem: async (req, res, next) => {
        try {
            const { userId, productId } = req.params;
            const { quantity } = req.body;
            if (!quantity) {
              return res.status(400).json({ message: "La cantidad es requerida" });
            }
            const cart = await cartServices.updateCartItem(userId, productId, quantity);
            res.status(200).json(cart);
        } catch (error) {
            
            console.log("Error al actualizar el carrito");
            if (error.message === "Carrito activo no encontrado" || error.message === "Producto no encontrado") {
                res.status(404).json({ message: error.message })
            };
            res.status(500).json({ message: "Error al actualizar el carrito" });
            next(error);
        }
    },
    removeCartItem: async (req, res, next) => {
        try {
            const { userId, productId } = req.params;
            const cart = await cartServices.removeCartItem(userId, productId);
            res.status(200).json(cart);
        } catch (error) {
            console.log("Error al eliminar el carrito");
            if (error.message === "Carrito activo no encontrado" || error.message === "Producto no encontrado") {
                res.status(404).json({ message: error.message })
            };
            res.status(500).json({ message: "Error al eliminar el carrito" });
            next(error);
        }
    },
    clearCart: async (req, res, next) => {
        try {
            const { userId } = req.params;
            const cart = await cartServices.clearCart(userId);
            res.status(200).json(cart);
        } catch (error) {
            console.log("Error al limpiar el carrito");
            if (error.message === "Carrito activo no encontrado") {
                res.status(404).json({ message: error.message })
            };
            res.status(500).json({ message: "Error al limpiar el carrito" });
            next(error);
        }
    }
}

export default cartController