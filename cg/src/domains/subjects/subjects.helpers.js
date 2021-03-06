const { Unauthorized, Forbidden } = require('../../utils/errors');
const { subjectJWT } = require('./../../utils/jwt');
const jwtMiddlewareFactory = require('./../../utils/jwt-middleware-factory');
const { hash } = require('../../utils/encryption');
const { NotFound } = require('../../utils/errors');
const { DATA_STATUSES } = require('./../../utils/constants');

const requireSubjectId = async (req, res, next) => {
  if (!req.subject.subjectId) {
    return next(new Unauthorized('You are not authorized to perform this action'));
  }

  req.subject.id = req.subject.subjectId;
  delete req.subject.subjectId;

  return next();
};

const transformSubjectId = async (req, res, next) => {
  req.subject.id = hash(req.subject.id.toString());
  next();
};

const assertSubjectExists = async (db, subjectId) => {
  const [subjectExists] = await db('subjects').where('id', subjectId);
  if (!subjectExists) {
    throw new NotFound('Subject not found');
  }
};

module.exports = {
  requireSubjectId,
  transformSubjectId,
  assertSubjectExists,
  verifyJWT: jwtMiddlewareFactory('subject', subjectJWT)
};
