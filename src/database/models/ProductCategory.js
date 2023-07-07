module.exports=(sequelize, dataTypes) => {

    let alias = "Productscategories";
    let cols = {
id:{
    type: dataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
} ,
title: {
    type: dataTypes.STRING,
    allowNull: false
},
subcategories: {
    type: dataTypes.INTEGER,
    allowNull: false
}

    }
    let config = {
        tableName: "products_category",
        timestamps:false
    }

    const ProductCategory = sequelize.define(alias, cols, config);

    ProductCategory.associate = function(models) {
        ProductCategory.hasMany(models.Products, {
            as: "productos",
            foreignKey: "category_id"
        })}

return ProductCategory;
}
