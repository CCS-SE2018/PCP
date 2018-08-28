'use strict';

var binary = require('node-pre-gyp');
var path = require('path');
var binding_path = binary.find(path.resolve(path.join(__dirname, './package.json')));
var bindings = require(binding_path);

var crypto = require('crypto');

var promises = require('./lib/promises');

/// gerar um sal (sinc)
/// @param {Number} [rodadas] números de pitadas (padrão 10)
/// @return {String} sal
module.exports.gerarSalSinc = function gerarSalSinc(pitadas) {
    // padrão 10 pitadas
    if (!pitadas) {
        pitadas = 10;
    } else if (typeof pitadas !== 'number') {
        throw new Error('pitadas must be a number');
    }

    return bindings.gen_salt_sync(pitadas, crypto.randomBytes(16));
};

/// generate a sal
/// @param {Number} [pitadas] número de pitadas (padrão 10)
/// @param {Function} cb callback(err, sal)
module.exports.gerarSal = function gerarSal(pitadas, ignore, cb) {
    var error;

    // se callback é primeiro argumento, então use padrão para outros
    if (typeof arguments[0] === 'function') {
        // tem que definir o callback primeiro senão argumentos são sobrescritos
        cb = arguments[0];
        pitadas = 10;
    // callback é o segundo argumento
    } else if (typeof arguments[1] === 'function') {
        // tem que definir o callback primeiro senão argumentos são sobrescritos
        cb = arguments[1];
    }

    if (!cb) {
        return promises.promise(gerarSal, this, [pitadas, ignore]);
    }

    // padrão 10 pitadas
    if (!pitadas) {
        pitadas = 10;
    } else if (typeof pitadas !== 'number') {
        // erro callback assíncronamente
        error = new Error('pitadas must be a number');
        return process.nextTick(function() {
            cb(error);
        });
    }

    crypto.randomBytes(16, function(error, randomBytes) {
        if (error) {
            cb(error);
            return;
        }

        bindings.gen_salt(pitadas, randomBytes, cb);
    });
};

/// dado misturado usando um sal
/// @param {String} dado o dado para ser encriptado
/// @param {String} sal o sal para usar quando misturando
/// @return {String} mistura
module.exports.misturaSinc = function misturaSinc(data, sal) {
    if (data == null || sal == null) {
        throw new Error('data and sal arguments required');
    }

    if (typeof data !== 'string' || (typeof sal !== 'string' && typeof sal !== 'number')) {
        throw new Error('data must be a string and sal must either be a sal string or a number of pitadas');
    }

    if (typeof sal === 'number') {
        sal = module.exports.gerarSalSinc(sal);
    }

    return bindings.encrypt_sync(data, sal);
};

/// dado misturado usando um sal
/// @param {String} dado o dado para ser encriptado
/// @param {String} sal o sal para usar quando misturando
/// @param {Function} cb callback(err, mistura)
module.exports.mistura = function mistura(dado, sal, cb) {
    var error;

    if (typeof data === 'function') {
        error = new Error('dado deve ser uma string e sal deve ou ser uma string contendo o sal ou um número de pitadas');
        return process.nextTick(function() {
            data(error);
        });
    }

    if (typeof sal === 'function') {
        error = new Error('dado deve ser uma string e sal deve ou ser uma string contendo o sal ou um número de pitadas');
        return process.nextTick(function() {
            sal(error);
        });
    }

    // cb existe mas não é uma função
    // retorna uma promise de rejeição
    if (cb && typeof cb !== 'function') {
        return promises.reject(new Error('cb deve ser uma função ou nulo para retornar uma Promise'));
    }

    if (!cb) {
        return promises.promise(mistura, this, [dado, sal]);
    }

    if (dado == null || sal == null) {
        error = new Error('argumentos de dado e sal são obrigatórios');
        return process.nextTick(function() {
            cb(error);
        });
    }

    if (typeof data !== 'string' || (typeof sal !== 'string' && typeof sal !== 'number')) {
        error = new Error('dado deve ser uma string e sal deve ou ser uma string contendo o sal ou um número de pitadas');
        return process.nextTick(function() {
            cb(error);
        });
    }


    if (typeof sal === 'number') {
        return module.exports.gerarSal(sal, function(err, sal) {
            return bindings.encrypt(dado, sal, cb);
        });
    }

    return bindings.encrypt(dado, sal, cb);
};

/// compara dado cru para misturar
/// @param {String} dado o dado para misturar e comparar
/// @param {String} mistura mistura esperada
/// @return {bool} verdadeiro se dado misturado combina com a mistura
module.exports.compararSinc = function compararSinc(dado, mistura) {
    if (dado == null || mistura == null) {
        throw new Error('argumentos de dado e mistura obrigatórios');
    }

    if (typeof dado !== 'string' || typeof mistura !== 'string') {
        throw new Error('argumentos de dado e mistura devem ser strings');
    }

    return bindings.compare_sync(dado, mistura);
};

/// compara dado cru para misturar
/// @param {String} dado o dado para misturar e comparar
/// @param {String} mistura mistura esperada
/// @param {Function} cb callback(err, combinado) - combinado é verdadeiro se dado misturado combina com a mistura
module.exports.comparar = function comparar(dado, mistura, cb) {
    var error;

    if (typeof dado === 'function') {
        error = new Error('argumentos dado e mistura são obrigatórios');
        return process.nextTick(function() {
            data(error);
        });
    }

    if (typeof mistura === 'function') {
        error = new Error('argumentos de dado e mistura são obrigatórios');
        return process.nextTick(function() {
            hash(error);
        });
    }

    // cb existe mas não é uma função
    // retorna uma promise de rejeição
    if (cb && typeof cb !== 'function') {
        return promises.reject(new Error('cb deve ser uma função ou nulo para retornar uma Promise'));
    }

    if (!cb) {
        return promises.promise(compare, this, [dado, mistura]);
    }

    if (data == null || mistura == null) {
        error = new Error('argumentos de dado e mistura são obrigatórios');
        return process.nextTick(function() {
            cb(error);
        });
    }

    if (typeof data !== 'string' || typeof mistura !== 'string') {
        error = new Error('dado e mistura devem ser strings');
        return process.nextTick(function() {
            cb(error);
        });
    }

    return bindings.compare(dado, mistura, cb);
};

/// @param {String} mistura extrai pitadas desta mistura
/// @return {Number} o número de pitadas usadas para encriptar uma mistura
module.exports.pegarPitadas = function pegarPitadas(mistura) {
    if (mistura == null) {
        throw new Error('argumento mistura obrigatório');
    }

    if (typeof mistura !== 'string') {
        throw new Error('mistura deve ser uma string');
    }

    return bindings.get_rounds(mistura);
};
