import { Router } from 'express';
import { generateTestHandler, chatWithAIHandler, submitTestHandler } from '../controllers/aiController';

const router = Router();

router.post('/generate-test', generateTestHandler);
router.post('/chat', chatWithAIHandler);
router.post('/submit-test', submitTestHandler);

export default router;
// import { Router } from 'express';
// import {
//     generateTestHandler,
//     chatWithAIHandler,
//     submitTestHandler,
//     addPDFHandler,
//     generateTestFromPDFHandler
// } from '../controllers/aiController';

// const router = Router();

// router.post('/generate-test', generateTestHandler);
// router.post('/chat', chatWithAIHandler);
// router.post('/submit-test', submitTestHandler);
// router.post('/add-pdf', addPDFHandler);
// router.post('/generate-test-from-pdf', generateTestFromPDFHandler);

// export default router;
