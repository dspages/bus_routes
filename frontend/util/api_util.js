

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

export const indexStops = function(){
  return $.ajax({
    method: 'GET',
    url: `./api/stops/`
  });
};

export const readStop = function(id){
  return $.ajax({
    method: 'GET',
    url: `./api/stops/${id}`
  });
};
