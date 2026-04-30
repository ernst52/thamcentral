export function errorHandler(err, req, res, next){
    console.error(err.message);

    const status = err.status || 500;
    const message = err.message || 'sum ting wong';

    res.status(status).json({ error: message});
}