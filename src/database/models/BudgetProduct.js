module.exports=(sequelize, dataTypes) => {

    let alias = "BudgetProduct";
    let cols = {
        id:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        product_id: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        quantity: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        logo: {
            type: dataTypes.STRING
        }
    }
    let config = {
        tableName: "budget_products",
        timestamps:false
    }

    const BudgetProduct = sequelize.define(alias, cols, config);
    
    return BudgetProduct;
}
