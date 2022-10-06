module.exports=(sequelize, dataTypes) => {

    let alias = "Brands";
    let cols = {
        id:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: dataTypes.STRING,
            allowNull: false
        }
    }
    let config = {
        tableName: "brands",
        timestamps:false
    }

    const Brands = sequelize.define(alias, cols, config);
    
    return Brands;
}
