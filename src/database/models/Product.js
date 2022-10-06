module.exports=(sequelize, dataTypes) => {

    let alias = "Products";
    
    let cols = {
        id:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: dataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: dataTypes.STRING,
            allowNull: false,
        },
        category_id: {
            type:dataTypes.INTEGER
        },
        created_at: {
            type: dataTypes.DATE
        },
        demanded: {
            type: dataTypes.INTEGER
        },
        brand: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        SKU: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        minimum_required: {
            type: dataTypes.INTEGER,
            allowNull: false
        }
    }
    
    let config = {
        tableName: "products",
        timestamps:false
    }

    const Product = sequelize.define(alias, cols, config);
    
    Product.associate = function(models) {
        Product.belongsTo(models.Productscategories , {
            as: "categoria",
            foreignKey: "category_id"
        })
    }
    return Product;
}
