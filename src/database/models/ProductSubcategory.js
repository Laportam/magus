module.exports=(sequelize, dataTypes) => {

    let alias = "Productssubcategories";
    let cols = {
id:{
    type: dataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
} ,
subtitle: {
    type: dataTypes.STRING,
    allowNull: false
},
product_category: {
    type: dataTypes.INTEGER,
    allowNull: false
}

    }
    let config = {
        tableName: "products_subcategories",
        timestamps:false
    }

    const ProductSubcategory = sequelize.define(alias, cols, config);
/*
    ProductCategory.associate = function(models) {
        ProductCategory.hasMany(models.Products, {
            as: "productos",
            foreignKey: "category_id"
        })}
*/
return ProductSubcategory;
}
