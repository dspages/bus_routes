


export const indexRoutes = function(){
  return $.ajax({
    method: 'GET',
    url: `./api/routes/`
  });
};

export const readRoute = function(id){
  return $.ajax({
    method: 'GET',
    url: `./api/routes/${id}`
  });
};
