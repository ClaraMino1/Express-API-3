export function cacheControl(req, res, next){
  if( req.method === 'GET' && req.path.startsWith('/api/products')){
    //permitimos guardar en cache por un maximo de 60 segundos
    res.set('Cache-Control', 'public, max-age=60');

    return next();
  }

  //POST, PUT, DELETE...
  //ordenamos que no guarde nada en cache
  res.set('Cache-Control', 'no-store');
  next();
};