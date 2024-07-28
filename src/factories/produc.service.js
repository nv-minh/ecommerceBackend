const {BusinessLogicError} = require("../core/error.response");
const {findAllDraftsForShop, findAllPublishForShop, publishProductByShop, searchProductByUser, findAllProducts, findById} = require("../repositories/product.repo")
const {getSelectData, unGetSelectData} = require("../utils");

class ProductService {

    static productRegistry = {}

    static registerProductType( type, classRef) {
        ProductService.productRegistry[type] = classRef
    }

    static async createProduct(type, payload) {
        const productClass = ProductService.productRegistry[type]
        if (!productClass) throw new BusinessLogicError(`Invalid product Types ${type}`)

        return new productClass(payload).createProduct()
    }

    // PUT
    static async publishProductByShop({product_shop, product_id}) {
        // find one
        return await publishProductByShop({product_shop, product_id})
    }

    // query
    static async findAllDraftsForShop({product_shop, limit = 50, skip = 0}) {
        const query = { product_shop, isDraft: true }
        return await findAllDraftsForShop({query, limit, skip})
    }

    static async findAllPublishForShop({product_shop, limit = 50, skip = 0}) {
        const query = { product_shop, isPublished: true }
        return await findAllPublishForShop({query, limit, skip})
    }

    static async searchProducts({keySearch}) {
        return await searchProductByUser({keySearch})
    }

    static async findAllProducts({limit = 50, sort = 'ctime', page = 1, filter = {isPublished: true}}) {
        return await findAllProducts({limit, sort, filter, page, select: getSelectData(['product_name', 'product_price', 'product_thumb'])})
    }

    static async findOneProduct(product_id) {
        return await findById({product_id, unSelect: unGetSelectData(['__v', 'variations'])})
    }

}

module.exports = {
    ProductService,
}