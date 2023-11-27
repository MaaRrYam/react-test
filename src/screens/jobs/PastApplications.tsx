import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import {FlashList} from '@shopify/flash-list';

import {PastApplicationCardInterface} from '@/interfaces';
import PastApplicationsCard from '@/components/Cards/PastApplicationsCard';
import {Loading} from '@/components';
import EmptyComponent from '@/components/NoResults/Empty';
import {jobMainStyles} from '@/styles/jobs';

const PastApplications = ({
  allJobs,
  isDataFetched,
}: PastApplicationCardInterface[]) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isFlatListRendered, setIsFlatListRendered] = useState(false);

  useEffect(() => {
    isDataFetched === true && setIsLoading(false);
  }, [isDataFetched]);

  useEffect(() => {
    if (isFlatListRendered && !isLoading) {
      setIsLoading(false);
    }
  }, [isFlatListRendered, isLoading]);

  return (
    <>
      {isLoading && !isFlatListRendered ? (
        <Loading />
      ) : allJobs.length ? (
        <FlashList
          data={allJobs}
          renderItem={({item}) => (
            <PastApplicationsCard
              jobTitle={item?.jobTitle!}
              companyLogo={item?.companyLogo}
              isAccepted={item?.isAccepted}
              isPending={item?.isPending}
              starred={item?.starred}
              rating={item?.rating!}
              feedback={item?.feedback}
              onPress={() => {}}
            />
          )}
          keyExtractor={item => item?.id?.toString()!}
          estimatedItemSize={100}
        />
      ) : (
        !isDataFetched &&
        allJobs.length && (
          <View style={jobMainStyles.emptyContainer}>
            <EmptyComponent />
          </View>
        )
      )}
    </>
  );
};

export default PastApplications;
