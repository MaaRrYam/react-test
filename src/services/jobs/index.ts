import {getUID} from '@/utils/functions';
import FirebaseService from '@/services/Firebase';
import {ApplicantInterface} from '@/interfaces/index';

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
  async checkAppliedForJob(jobID: string) {
    return FirebaseService.getDocumentsByQuery(
      `jobs/${jobID}/applications`,
      'applicantId',
      '==',
      UID,
    );
  },
  async checkExistingJobApplication() {
    let item: ApplicantInterface[] = [];
    const jobs = await FirebaseService.getAllDocuments('jobs');

    await Promise.all(
      jobs.map(async job => {
        const subJob: ApplicantInterface[] =
          await FirebaseService.getDocumentsByQuery(
            `jobs/${job.id}/applications`,
            'applicantId',
            '==',
            UID,
          );

        subJob.forEach(sub => {
          if (
            sub.isAccepted === false &&
            sub.isPending === true &&
            sub.starred === false
          ) {
            item.push(sub);
          } else if (
            sub.isAccepted === false &&
            sub.isPending === false &&
            sub.starred === true
          ) {
            item.push(sub);
          }
        });
      }),
    );
    return item;
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
