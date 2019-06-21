const env = process.env.NODE_ENV || 'dev';

const config = () => {
    switch (env) {
        case 'dev':
            return {
                bd_string: 'mongodb+srv://Filipi:intelligir123@cluster0-xm1li.mongodb.net/test?retryWrites=true&w=majority',
                jwt_pass: 'Filipi123',
                jwt_expires_in: '7d',

            }
        case 'html':
            return {
                bd_string: 'mongodb+srv://Filipi:intelligir123@cluster0-xm1li.mongodb.net/test?retryWrites=true&w=majority',
                jwt_pass: 'Filipi123',
                jwt_expires_in: '7d',

            }
        case 'prod':
            return {
                bd_string: 'mongodb+srv://Filipi:intelligir123@cluster0-xm1li.mongodb.net/test?retryWrites=true&w=majority',
                jwt_pass: 'Filipi123',
                jwt_expires_in: '7d',

            }
    }

    console.log('Iniciando a API em ambiente ${env.toUpperCase()}')

    module.exports = config();

}