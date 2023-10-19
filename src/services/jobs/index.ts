import {getUID} from '@/utils/functions';
import FirebaseService from '@/services/Firebase';
import {
  ApplicantInterface,
  JobInterface,
  UserInterface,
} from '@/interfaces/index';
import Cache from '@/cache';

let UID: string;
(async () => {
  UID = (await getUID()) as string;
})();

const JobsService = {
  async getAllJobs() {
    return FirebaseService.getAllDocuments('jobs') as JobInterface[];
  },
  async getAllSavedJobs() {
    try {
      const allJobs: JobInterface[] = [];
      const allSavedJobId = await FirebaseService.getAllDocuments(
        `savedItems/${UID}/jobs`,
      );

      if (allSavedJobId) {
        const promises = allSavedJobId.map(async job => {
          const res = await FirebaseService.getDocument('jobs', job.jobId);
          return res;
        });

        const savedJobs = await Promise.all(promises);
        allJobs.push(...savedJobs);
      }

      return allJobs;
    } catch (error) {
      // Handle any errors that may occur during the process
      console.error('Error fetching saved jobs:', error);
    }
  },

  async getAllPastApplications() {
    try {
      const allPastApplications: ApplicantInterface[] = [];
      const allJobs = await FirebaseService.getAllDocuments('jobs');

      if (allJobs) {
        const promises = allJobs.map(async job => {
          const res = await FirebaseService.getDocumentsByQuery(
            `jobs/${job.id}/applications`,
            'applicantId',
            '==',
            UID,
          );
          return res;
        });

        const pastJobs = await Promise.all(promises);
        allPastApplications.push(...pastJobs);
      }
      console.log(allPastApplications);
      return allPastApplications;
    } catch (error) {
      // Handle any errors that may occur during the process
      console.error('Error fetching saved jobs:', error);
    }
  },

  async checkSavedJob(jobId: string) {
    return FirebaseService.getDocument(`savedItems/${UID}/jobs`, jobId);
  },
  async saveJob(jobId: string) {
    return FirebaseService.setDoc(`savedItems/${UID}/jobs`, jobId, {
      jobId: jobId,
    });
  },
  async unSaveJob(jobId: string) {
    return FirebaseService.deleteDocument(`savedItems/${UID}/jobs`, jobId);
  },
  async getPosterJob(userID: string) {
    let user = {} as UserInterface;

    if (await Cache.get(`user_${userID}`)) {
      user = (await Cache.get(`user_${userID}`)) as UserInterface;
    } else {
      user = (await FirebaseService.getDocument(
        'users',
        userID,
      )) as UserInterface;
      await Cache.set(`user_${userID}`, user);
    }
    return user;
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
        const subJob = (await FirebaseService.getDocumentsByQuery(
          `jobs/${job.id}/applications`,
          'applicantId',
          '==',
          UID,
        )) as ApplicantInterface[];

        subJob.forEach(sub => {
          if (!sub.isAccepted && sub.isPending && !sub.starred) {
            item.push(sub);
          } else if (!sub.isAccepted && !sub.isPending && sub.starred) {
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
