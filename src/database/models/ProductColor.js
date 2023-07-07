module.exports=(sequelize, dataTypes) => {

    let alias = "ProductsColors";
    let cols = {
        id_product:{
            type: dataTypes.INTEGER,
        },
        id_color: {
            type: dataTypes.INTEGER
        },
        auto_increment: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
        }
    }
    let config = {
        tableName: "products_colors",
        timestamps:false
    }

    const ProductsColors = sequelize.define(alias, cols, config);
    
    return ProductsColors;
}