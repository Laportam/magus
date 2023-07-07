module.exports=(sequelize, dataTypes) => {

    let alias = "ClientsImages";
    let cols = {
        id:{
            type: dataTypes.INTEGER,
            allowNull: false
        },
        filename: {
            type: dataTypes.STRING,
            allowNull: false
        },
        auto_inc_decoy: {
            type: dataTypes.STRING,
            primaryKey: true,
            allowNull: false
        }
    }
    let config = {
        tableName: "clients_images",
        timestamps:false
    }

    const ClientsImages = sequelize.define(alias, cols, config);
    
    return ClientsImages;
}