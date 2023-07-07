module.exports=(sequelize, dataTypes) => {

    let alias = "Colors";
    let cols = {
        id_color:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        color: {
            type: dataTypes.STRING
        },
        hex_color: {
            type: dataTypes.STRING
        }
    }
    let config = {
        tableName: "Colors",
        timestamps:false
    }

    const Colors = sequelize.define(alias, cols, config);
    
    return Colors;
}