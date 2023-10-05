import {getUID} from '@/utils/functions';
import FirebaseService from '../Firebase';

let UID: string;
(async () => {
  UID = await getUID();
})();

const JobsService = {
  async getAllJobs() {
    return FirebaseService.getAllDocuments('jobs');
  },
  async getPosterJob(userID: string) {
    return FirebaseService.getDocument('users', userID);
  },
  async applyForJob(jobID: string) {
    return FirebaseService.addDocument(`jobs/${jobID}/applications`, {
      applicantId: UID,
      timeStamp: FirebaseService.serverTimestamp(),
      starred: false,
      isAccepted: false,
      isPending: true,
      feedback: '',
      notes: '',
      rating: 0,
    });
  },
  async applyForJobWithCustomQuestions(
    jobID: string,
    customQuestions: Array<Object>,
  ) {
    return FirebaseService.addDocument(`jobs/${jobID}/applications`, {
      applicantId: UID,
      timeStamp: FirebaseService.serverTimestamp(),
      customQuestions: customQuestions,
      starred: false,
      isAccepted: false,
      isPending: true,
      feedback: '',
      notes: '',
      rating: 0,
    });
  },
};

export default JobsService;
