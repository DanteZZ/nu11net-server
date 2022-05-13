const {NAME, DESCRIPTION} = process.env;

export const getServerInfo = async (client,payload,response) => {
    response({
        hash: global.SERVER_UNIQUE_HASH,
        name: NAME,
        description: DESCRIPTION
    })
}